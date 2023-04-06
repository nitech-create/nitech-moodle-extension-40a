import type { Feature } from '../common/types.ts';

/** TOCを折りたたむ */
const collapseToc: Feature<void, void> = {
  uniqueName: 'scorm-collapse-toc',
  hostnameFilter: 'cms7.ict.nitech.ac.jp',
  pathnameFilter: /^\/moodle40a\/mod\/scorm/,
  loader: () => {
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
