export const queryAllVideosPage = templateKey => graphql =>
  graphql(
    `
      query AllVideosPage($templateKey: String!) {
        markdownRemark(frontmatter: {templateKey: {eq: $templateKey}}) {
          html
          frontmatter {
            title
            heading
            subheading
            templateKey
            videos {
              id
            }
          }
        }
      }
    `,
    {templateKey}
  );
