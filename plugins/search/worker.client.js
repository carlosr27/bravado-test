import Worker from '~/assets/js/search.worker.js'

class SearchWorker {
  #worker

  get worker() {
    return this.#worker
  }

  dispatch(message) {
    if (this.worker) this.#worker.terminate()
    return new Promise((resolve, reject) => {
      this.#worker = new Worker()
      this.worker.onmessage = resolve
      this.worker.onerror = reject
      this.worker.postMessage(message)
    })
  }

  // #handleMessages(message) {
  //   const event = message.data.type
  //   const payload = message.data
  //   delete payload.type
  //   this.emit(event, payload)
  // }
}

export default (_, inject) => {
  inject('worker', new SearchWorker())
}
