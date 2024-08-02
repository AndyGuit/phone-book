class CallController {
  #currentCall = null;
  #callHistory = [];

  constructor() {
    Call.addSubscription(Call.EVENT_TYPES.changeStatus, this.#trackCallStatus);
    Call.addSubscription(Call.EVENT_TYPES.changeDuration, (duration) => {
      console.log('Current duration: ', duration);
    });
  }

  startCall({ phone }) {
    if (!Call.validatePhone(phone)) {
      console.warn('Phone number is not valid');
      return null;
    }

    if (!this.#currentCall) {
      this.#currentCall = new Call(phone);
      return this.#currentCall;
    }

    console.warn(`You have another call [${this.#currentCall.status}] status`);
    return this.#currentCall;
  }

  endCall() {
    if (this.#currentCall === null) {
      console.log('No call in progress');
      return;
    }

    this.#currentCall.endCallByCaller();
    this.#killCurrentCall();
  }

  #trackCallStatus = (newStatus, oldStatus) => {
    console.log('CallController track status change: ', oldStatus, '>', newStatus);

    if (!Call.endCallStatuses.includes(newStatus)) return null;
    return this.#killCurrentCall();
  };

  #killCurrentCall() {
    this.#callHistory.push(Object.freeze(this.#currentCall));
    this.#currentCall = null;

    return this.#callHistory.at(-1);
  }

  get currentCall() {
    return structuredClone(this.#currentCall);
  }

  get callHistory() {
    return [...this.#callHistory];
  }
}

const callController = new CallController();
