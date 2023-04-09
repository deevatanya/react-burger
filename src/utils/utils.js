export async function getData(URL) {
  try {
    const res = await fetch(URL);
    if (res.ok) {
      return await res.json();
    } else {
      return await res.json()
        .then((err) => Promise.reject(err))
    }
  } catch (e) {
    alert('ooops, error:', e.message);
    console.error(e);
  }
};
