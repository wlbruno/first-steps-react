import './styles.css';

import { Component } from 'react';

import { loadPosts } from '../../utils/loadPots';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component{
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    take: 2
    }

  componentDidMount(){
   this.loadPosts();
  }

  loadPosts = async () => {
    const postsAndPhotos = await loadPosts()
    this.setState({ 
      posts : postsAndPhotos.slice(0, 2) ,
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

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render(){
    const { posts, page, take, allPosts, searchValue } = this.state;
    const noMorePosts = page + take >= allPosts.length;

    const filteredPosts = !!searchValue ? allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    }) : posts;

    return (
      <section className='container'>
        <div className='search-container'>
          {!!searchValue && (
            <h1>Search value: {searchValue}</h1>
          )}
          <TextInput handleChange={this.handleChange} searchValue={searchValue} />
        </div>
        
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}
        
        {filteredPosts.length === 0 && (
            <p>Não existem posts =( </p>
        )}

          <div className='button-container'>
            {!searchValue && (
              <Button 
                text="Load more post"
                onclick={this.loadMorePosts}
                disabled={noMorePosts}
              />
            )}
          </div>
      </section>
     )
  }
};
