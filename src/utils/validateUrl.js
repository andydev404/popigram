export default function(url) {
  let post = url.split('/?')[0];
  let regex = /(https?:\/\/www\.)?instagram\.com(\/p\/\w+\/?)/;
  return post.match(regex) ? post.match(regex)[0] + '?__a=1' : false;
}
