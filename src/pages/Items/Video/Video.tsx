import React from 'react';
import styled from 'styled-components';

import Markdown from '../Markdown';

const VideoWrapper = styled.div`
  width: 100%;
  padding-bottom: 56%;
  height: 0;
  position: relative;
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
  }
`;

const Video = ({ data }) => (
  <>
    <Markdown data={{ title: data.title, content: data.description }} />
    <VideoWrapper>
      <iframe
        src={data.src}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </VideoWrapper>
  </>
);

export default Video;
