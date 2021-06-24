export default class ApiService {
  basicURL = 'https://api.themoviedb.org/3';

  apiKey = 'eb188827a4415701c88cf88aef3ea450';

  getRequest = async (url, body = {}) => {
    const res = await fetch(`${this.basicURL}${url}`, body);

    if (!res.ok) throw new Error(`Could not fetch URL, received ${res.status}`);

    const result = await res.json();
    return result;
  };

  getFilmsList = (filmTitle, page = 1) =>
    this.getRequest(`/search/movie?api_key=${this.apiKey}&query=${filmTitle}&page=${page}`);

  getFullGenresList = () => this.getRequest(`/genre/movie/list?api_key=${this.apiKey}`);

  getGuestSession = async () => {
    const response = await this.getRequest(`/authentication/guest_session/new?api_key=${this.apiKey}`);
    return response.guest_session_id;
  };

  onRatedMovie = (id, rate, guestSessionId) =>
    this.getRequest(`/movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${guestSessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value: rate }),
    });

  getRatedMovies = (guestSessionId, page = 1) =>
    this.getRequest(`/guest_session/${guestSessionId}/rated/movies?api_key=${this.apiKey}&page=${page}`);
}
