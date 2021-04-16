// Thisk of it as parsing dummy JSON
const posts = [
  { title: 'Post One', body: 'This is post One' },
  { title: 'Post Two', body: 'This is post Two' }
];

function getPosts() {
  setTimeout(() => {
    let output = '<ul>';
    posts.forEach((post, index) => {
      output += `<li>${post.title}</li>`;
    });
    output += '</ul>';
    document.body.innerHTML = output;
  }, 1000);
}

function createPost(post, callback) {
  setTimeout(() => {
    posts.push(post);
    callback();
  }, 2000);
}

// getPosts();

createPost({ title: 'Post Three', body: 'This is post Three' }, getPosts);
