import { MoovMoneyTestServer } from '#server/moov_money_test.server';

let server = new MoovMoneyTestServer()

export function setup() {
    if (!server.started) server = server.start()
}

export function teardown() {
    if (server.started) server.stop()
}