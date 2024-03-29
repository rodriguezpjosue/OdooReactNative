"use strict";
import axios from "axios";
class Odoo {
  constructor(config) {
    config = config || {};
    this.host = config.host;
    this.port = config.port || 80;
    this.database = config.database;
    this.username = config.username || null;
    this.password = config.password || null;
    this.session_id = config.session_id || null;
    this.context = config.context;
  }
  authenticate(cb) {
    var body = JSON.stringify({
      params: {
        db: this.database,
        login: this.username,
        password: this.password,
      },
    });
    var requestConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Content-Length": body.length,
      },
      data: body,
      withCredentials: false,
      baseURL: this.host + ":" + this.port,
      url: "/web/session/authenticate",
    };
    return axios(requestConfig).then(
      (response) => {
        if (response.data.error) {
          cb(response.data.error, null);
        } else {
          this.context = response.data.result.user_context;
          cb(null, response.data.result);
        }
      },
      (error) => {
        cb(error, null);
      }
    );
  }
  search(model, params, callback) {
    this._request(
      "/web/dataset/call_kw",
      {
        kwargs: {
          context: this.context,
        },
        model: model,
        method: "search",
        args: [params.domain],
      },
      callback
    );
  }
  search_read(model, params, callback) {
    this._request(
      "/web/dataset/call_kw",
      {
        model: model,
        method: "search_read",
        args: [],
        kwargs: {
          context: this.context,
          domain: params.domain,
          offset: params.offset,
          limit: params.limit,
          order: params.order,
          fields: params.fields,
        },
      },
      callback
    );
  }
  read(model, params, callback) {
    this._request(
      "/web/dataset/call_kw",
      {
        model: model,
        method: "read",
        args: [params.ids],
        kwargs: {
          fields: params.fields,
        },
      },
      callback
    );
  }
  create(model, params, callback) {
    this._request(
      "/web/dataset/call_kw",
      {
        kwargs: {
          context: this.context,
        },
        model: model,
        method: "create",
        args: [params],
      },
      callback
    );
  }
  update(model, id, params, callback) {
    if (id) {
      this._request(
        "/web/dataset/call_kw",
        {
          kwargs: {
            context: this.context,
          },
          model: model,
          method: "write",
          args: [[id], params],
        },
        callback
      );
    }
  }
  delete(model, id, callback) {
    this._request(
      "/web/dataset/call_kw",
      {
        kwargs: {
          context: this.context,
        },
        model: model,
        method: "unlink",
        args: [[id]],
      },
      callback
    );
  }
  // Call RPC Controller Generic
  rpc_call(endpoint, params, callback) {
    this._request(endpoint, params, callback);
  }
  // Private functions
  _request(path, params, cb) {
    params = params || {};
    var url = this.host + ":" + this.port + (path || "/") + "";
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (this.session_id) {
      headers["cookie"] = "session_id=" + this.session_id + ";";
    }
    var requestConfig = {
      method: "POST",
      headers: headers,
      data: JSON.stringify({
        jsonrpc: "2.0",
        id: new Date().getUTCMilliseconds(),
        method: "call",
        params: params,
      }),
      withCredentials: false,
      baseURL: this.host + ":" + this.port,
      url: (path || "/") + "",
    };

    axios(requestConfig).then(
      (response) => {
        if (response.data.error) {
          cb(response.data.error, null);
        } else {
          cb(null, response.data.result);
        }
      },
      (err) => {
        cb(err, null);
      }
    );
  }
}


export default Odoo;
