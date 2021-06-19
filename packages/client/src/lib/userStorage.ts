export default class UserStorage {
  public static get() {
    return localStorage.getItem('user_id');
  }

  public static set(user_id: string) {
    return localStorage.setItem('user_id', user_id);
  }
}
