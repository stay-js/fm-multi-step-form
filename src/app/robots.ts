import type { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: '*',
      allow: '/',
    },
  ],
  host: 'https://fm-multi-step-form.znagy.hu',
  sitemap: 'https://fm-multi-step-form.znagy.hu/sitemap.xml',
});

export default robots;
