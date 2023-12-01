import type { MetadataRoute } from 'next';

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: 'https://fm-multi-step-form.znagy.hu',
    lastModified: new Date().toISOString().split('T')[0],
  },
];

export default sitemap;
