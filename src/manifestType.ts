type RunAt = 'document_start' | 'document_end' | 'document_idle';

interface ContentScript {
  matches: string[];
  js?: string[];
  css?: string[];
  run_at: RunAt;
  match_about_blank: boolean;
  match_origin_as_fallback: boolean;
}

export default interface ManifestType {
  manifest_version: 3;
  name: string;
  version: string;

  description: string;

  author: string;
  content_scripts: ContentScript[];
  content_security_policy: {
    extension_pages?: string;
    sandbox?: string;
  };
  options_ui: {
    page: string;
    js: string[];
  };

  permissions: string[];
  host_permissions: string[];
}
