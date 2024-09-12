import { readBlockConfig } from '../../scripts/aem.js';

/**
 * Decorates the video block by extracting video information and embedding the video.
 * Supports YouTube, Vimeo, and URL types.
 * @param {Element} block The video block element
 */
export default function decorate(block) {
  // Extract configuration from the block
  const config = readBlockConfig(block);

  // Clear the block's contents
  block.textContent = '';

  // Create and append title and description if they exist in the config
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

  // Check if VideoID and type are available
  if (config.videoid && config.type) {
    const videoContainer = document.createElement('div');
    videoContainer.className = 'video-container';

    // Handle different video types
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
        videoEl.src = config.videoid; // Use videoid as the URL in this case
        videoEl.type = 'video/mp4'; // Default to mp4, could add more formats
        videoEl.style.width = '100%';
        videoContainer.appendChild(videoEl);
        break;

      default:
        console.error(`Unsupported video type: ${config.type}`);
    }

    block.appendChild(videoContainer);
  }
}
