import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public readonly loadingSub = new BehaviorSubject(false);
  public readonly loadingMap = new Map<string, boolean>();

  public setLoading = (loading: boolean, url: string) => {
    if (!url) {
      throw new Error("Url should be provided")
    }

    if (loading) {
      this.loadingMap.set(url, loading)
      this.loadingSub.next(true);
    } else if (!loading && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }

    if (this.loadingMap.size === 0) {
      this.loadingSub.next(false)
    }
  }

  constructor() {
  }
}
