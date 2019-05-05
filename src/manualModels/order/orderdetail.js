export default {
  state: {
    comments: [],
    date: new Date(),
  },
  reducers: {
    addComment(state, { comment }) {
      state.comments.push(comment);
      return {
        ...state,
      };
    },
  },
};
