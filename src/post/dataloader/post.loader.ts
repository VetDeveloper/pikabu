import { PostEntity } from '../post.entity';
import { PostService } from '../post.service';
import * as DataLoader from 'dataloader';

export async function createPostsLoader(postService: PostService) {
  return new DataLoader<number, PostEntity>(async (ids) => {
    const posts : PostEntity[] = await postService.getPostsByIds(ids);

    const postsMap = new Map(posts.map((post, i) => [i, post]));

    console.log(posts);

    return ids.map((id) => postsMap[id]);
  });
}

