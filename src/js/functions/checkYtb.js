export default () => {

    let url = location.href,
        arrUrl = url.split('/');

    if(arrUrl.indexOf('www.youtube.com') < 0) {
        return true;
    } else {
        return false;
    }
}