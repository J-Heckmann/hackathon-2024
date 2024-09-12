import { readBlockConfig } from '../../scripts/aem.js';

/**
 * Decorates the video block by extracting video information and embedding the video.
 * Supports YouTube, Vimeo, and URL types.
 * @param {Element} block The video block element
 */
export default function decorate(block) {
  const config = readBlockConfig(block);

  block.textContent = '';

  if (config.title) {
    const titleEl = document.createElement('div');
    titleEl.className = 'video-header';
    titleEl.textContent = config.title;
    block.appendChild(titleEl);
  }

  if (config.description) {
    const descEl = document.createElement('div');
    descEl.className = 'video-description';
    descEl.textContent = config.description;
    block.appendChild(descEl);
  }

  if (config.videoid && config.type) {
    const videoContainer = document.createElement('div');
    videoContainer.className = 'video-inner-container';

    let iframe;

    switch (config.type.toLowerCase()) {
      case 'youtube':
        iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${config.videoid}?rel=0`;
        iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        videoContainer.appendChild(iframe);
        break;

      case 'vimeo':
        iframe = document.createElement('iframe');
        iframe.src = `https://player.vimeo.com/video/${config.videoid}`;
        iframe.allow = 'autoplay; fullscreen; picture-in-picture';
        iframe.allowFullscreen = true;
        videoContainer.appendChild(iframe);
        break;

      case 'url':
        const videoEl = document.createElement('video');
        videoEl.controls = true;
        videoEl.src = config.videoid;
        videoEl.type = 'video/mp4'; 
        videoEl.style.width = '100%';
        videoContainer.appendChild(videoEl);
        break;

      default:
        console.error(`Unsupported video type: ${config.type}`);
    }

    block.appendChild(videoContainer);
  }
}
