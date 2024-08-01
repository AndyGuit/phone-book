class Call {
  #connectTimeout = 1500;
  #inProgressTimeout = 5000;
  static CALL_STATUSES = {
    connecting: 'connecting',
    inProgress: 'in progress',
    rejected: 'rejected',
    disconnected: 'disconnected',
  };

  #status = null;
  #phone = null;
  #duration = 0;
  #timerId = null;
  #startDate = null;
  #endDate = null;

  constructor(phone) {
    if (!Call.validatePhone(phone)) throw new Error(`Phone [${phone}] is not valid`);

    this.#phone = phone;

    this.#handleCall();
  }

  #handleCall() {
    this.#changeStatus(Call.CALL_STATUSES.connecting);
  }

  #changeStatus(newStatus) {
    console.log('Status change: ', this.#status, '>', newStatus);
    const endCallStatuses = [Call.CALL_STATUSES.rejected, Call.CALL_STATUSES.disconnected];

    if (newStatus === Call.CALL_STATUSES.connecting) {
      setTimeout(() => {
        this.#status = newStatus;
        this.#startCalcDuration();
        this.#changeStatus(this.#randomCallStatus);
      }, this.#connectTimeout);
    }

    if (newStatus === Call.CALL_STATUSES.inProgress) {
      setTimeout(() => {
        this.#status = newStatus;
        this.#changeStatus(Call.CALL_STATUSES.disconnected);
      }, this.#inProgressTimeout);
    }

    if (endCallStatuses.includes(endCallStatuses)) {
      this.#status = newStatus;
      this.#stopCalcDuration();
    }

    if (newStatus === Call.CALL_STATUSES.inProgress) {
    }
  }

  #startCalcDuration() {
    this.#startDate = new Date();
    this.#timerId = setInterval(() => (this.#duration += 1), 1000);
  }

  #stopCalcDuration() {
    clearInterval(this.#timerId);
    this.#timerId = null;
    this.#endDate = new Date();
  }

  get phone() {
    return this.#phone;
  }

  get duration() {
    return this.#duration;
  }

  get startDate() {
    return this.#startDate;
  }

  get endDate() {
    return this.#endDate;
  }

  static validatePhone(phone) {
    return typeof phone === 'string' && phone.length > 0;
  }

  get #randomCallStatus() {
    const randomNumber = Math.round(Math.random() * 10);

    return randomNumber > 5 ? Call.CALL_STATUSES.rejected : Call.CALL_STATUSES.inProgress;
  }
}

const call = new Call('1111');
