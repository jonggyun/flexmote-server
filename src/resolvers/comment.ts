import { getRepository } from 'typeorm';
import uuid from 'uuid/v1';

import Comment from '../entity/Comment';

import { CommentProps } from 'types';

export default {
  Query: {
    getCommentsByCompany: async (
      _: any,
      { company_id }: { company_id: string },
    ) => {
      return await getRepository(Comment).find({ company_id });
    },
  },
  Mutation: {
    addComment: async (_: any, args: CommentProps) => {
      const comment_id = uuid();
      const comment = new Comment();
      comment.comment_id = comment_id;
      comment.company_id = args.company_id;
      comment.user_id = args.user_id;
      comment.username = args.username;
      comment.title = args.title;
      comment.content = args.content;
      comment.rating = args.rating;
      comment.created_at = new Date();

      await getRepository(Comment).insert(comment);
    },
  },
};
