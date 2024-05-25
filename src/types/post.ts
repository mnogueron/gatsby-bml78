export type Post = {
  featuredimage: any; // TODO type the image
  heading: string | null;
  cardTitle: string | null;
  cardSubtitle: string | null;
  date: string | null;
  fields: {
    slug: string | null;
  };
};
