import Worker from '~/assets/js/search.worker.js'

class SearchWorker {
  #worker

  get worker() {
    return this.#worker
  }

  dispatch(message) {
    if (this.worker) this.terminate()
    return new Promise((resolve, reject) => {
      this.#worker = new Worker()
      this.#worker.onmessage = (message) => {
        this.#worker = null
        resolve(message)
      }
      this.#worker.onerror = reject
      this.#worker.postMessage(message)
    })
  }

  terminate() {
    if (this.#worker) this.#worker.terminate()
  }
}

export default (_, inject) => {
  inject('worker', new SearchWorker())
}
