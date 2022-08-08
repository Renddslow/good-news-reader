import sgMail from '@sendgrid/mail';
import fauna from 'faunadb';
import { to } from 'await-to-js';
import fs from 'fs';
import path from 'path';
import templite from 'templite';

const q = fauna.query;
const client = new fauna.Client({
  secret: process.env.FAUNA_KEY || '',
  domain: 'db.us.fauna.com',
  scheme: 'https',
});

sgMail.setApiKey(process.env.SENDGRID_KEY);

const send = async ([emailPath]) => {
  if (!emailPath) {
    process.exit(1);
  }

  const [err, res] = await to(
    client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('all-users')), { size: 250 }),
        q.Lambda('x', q.Get(q.Var('x'))),
      ),
    ),
  );

  if (err) {
    console.error(err);
    process.exit(1);
  }

  const template = fs.readFileSync(path.join(process.cwd(), 'emails', emailPath)).toString();

  const users = res.data.map(({ data }) => ({ ...data }));

  await Promise.all(
    users.map((user) => {
      return sgMail.send({
        html: templite(template, { firstName: user.firstName }),
        subject: 'We released a new game! | Good News Reader',
        from: {
          email: 'no-reply@flatland.church',
          name: 'Matt at Flatland',
        },
        replyTo: {
          email: 'mubatt@wyopub.com',
          name: 'Matt McElwee',
        },
        to: user.email,
      });
    }),
  );
  console.log(`${users.length} emails sent`);
};

send(process.argv.slice(2));
