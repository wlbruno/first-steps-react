import './styles.css';
import { Component } from 'react';
import { loadPosts } from '../../utils/loadPots';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';

export class Home extends Component{
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    take: 10
    }

  componentDidMount(){
   this.loadPosts();
  }

  loadPosts = async () => {
    const { page, take }  = this.state;

    const postsAndPhotos = await loadPosts()
    this.setState({ 
      posts : postsAndPhotos.slice(0, 10) ,
      allPosts: postsAndPhotos
    });
  }

  loadMorePosts = () => {
    const {
      page,
      take,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + take;
    const nextPosts = allPosts.slice(nextPage, nextPage + take);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  render(){
    const { posts, page, take, allPosts } = this.state;
    const noMorePosts = page + take >= allPosts.length;

    return (
      <section className='container'>
        <Posts posts={posts} />
          <div class='button-container'>
            <Button 
            text="Load more post"
            onclick={this.loadMorePosts}
            disabled={noMorePosts}
            />
          </div>
      </section>
     )
  }
};
