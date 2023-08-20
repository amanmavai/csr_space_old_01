import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";

import cx from "classnames";

const lightMachine = createMachine({
  id: "lightDelay",
  initial: "red",
  states: {
    red: {
      after: {
        // after 0.5 seconds, transition to green
        500: { target: "yellow" },
      },
    },
    yellow: {
      after: {
        // after 0.5 seconds, transition to red
        500: { target: "green" },
      },
    },
    green: {
      after: {
        // after 0.5 seconds, transition to yellow
        500: { target: "red" },
      },
    },
  },
});

/**
 * send will dispatch an event to the machine service
 * which in turn will transition to next state
 *
 * at any point in time machine is in some state (current state)
 * you keep sending 'events' on every event it moves to
 * nextState
 *
 *
 * at any givent moment
 * current-state => EVENT => next-state
 *
 */
export function Component() {
  const [state] = useMachine(lightMachine);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-indigo-500 text-3xl font-bold">Traffic Light</h1>
      <div className={cx({ "bg-red-500": state.value === "red" }, "bg-gray-300 h-32 w-32 rounded-full m-3")} />
      <div className={cx({ "bg-yellow-500": state.value === "yellow" }, "bg-gray-300 h-32 w-32 rounded-full m-3")} />
      <div className={cx("bg-gray-300", { "bg-green-600": state.value === "green" }, "h-32 w-32 rounded-full m-3")} />
    </div>
  );
}
