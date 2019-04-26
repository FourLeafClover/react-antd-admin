export default {
  state: {
    comments: [],
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
