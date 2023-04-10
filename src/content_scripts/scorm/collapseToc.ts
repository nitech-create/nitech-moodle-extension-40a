import type { Feature } from '../common/types.ts';

type CollapseTocOptions = {
  enabled: boolean;
};

/** TOCを折りたたむ */
const collapseToc: Feature<CollapseTocOptions> = {
  uniqueName: 'scorm-collapse-toc',
  hostnameFilter: 'cms7.ict.nitech.ac.jp',
  pathnameFilter: /^\/moodle40a\/mod\/scorm/,
  defaultOption: {
    enabled: true,
  },
  loader: (options) => {
    if (!options.enabled) {
      return;
    }

    const elScormToc = document.getElementById('scorm_toc');
    console.log('EXT: ', elScormToc);

    if (!elScormToc) {
      return;
    }
    if (elScormToc.classList.contains('disabled')) {
      // すでに折りたたまれている
      return;
    }

    const elTocToggleButton = document.getElementById('scorm_toc_toggle_btn');
    elTocToggleButton?.click();
  },
};

export default collapseToc;
