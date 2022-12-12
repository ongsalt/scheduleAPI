import PocketBase, { BaseAuthStore } from 'pocketbase';


async function initPocketBase(req, res) {
  const pb = new PocketBase('http://127.0.0.1:8090');

  // load the store data from the request cookie string
  pb.authStore.loadFromCookie(req?.headers?.cookie || '');

  // send back the default 'pb_auth' cookie to the client with the latest store state
  pb.authStore.onChange(() => {
    res?.setHeader('set-cookie', pb.authStore.exportToCookie());
  });

  try {
      // get an up-to-date auth store state by veryfing and refreshing the loaded auth model (if any)
      pb.authStore.isValid && await pb.collection('users').authRefresh();
  } catch (_) {
      // clear the auth store on failed refresh
      pb.authStore.clear();
  }

  return pb
}

async function login(req, res, username, password) {
  const pb = await initPocketBase(req, res);
  try {
    await pb.collection('users').authWithPassword(username, password);
    return true;
  } catch (e) {
    console.log(e)
    return false;
  }
}


export { initPocketBase, login }