export type SitePageContext = {
  id: string;
  title?: string;
  seo: {
    title?: string;
    description?: string;
    image?: string;
  };
  templateKey: string;
};

export type PostPageContext = SitePageContext & {
  next?: any; // TODO type
  previous?: any; // TODO type
};
