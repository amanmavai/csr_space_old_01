/* eslint-disable no-console */
// Hook flow
// https://github.com/donavon/hook-flow
// http://localhost:3000/isolated/examples/hook-flow.js

import * as React from "react";

const state = {
  App: 0,
  Child: 0,
  Child2: 0,
};
function Child() {
  const phase = state.Child > 0 ? "[UPDATE]" : "[MOUNT]";
  console.log(`%c    Child: render start ${phase}`, "color: MediumSpringGreen");

  const [count, setCount] = React.useState(() => {
    console.log("%c    Child: useState(() => 0)", "color: tomato");
    return 0;
  });

  React.useEffect(() => {
    state.Child++;
    console.log("%c    Child: useEffect(() => {})", "color: LightCoral");
    return () => {
      console.log("%c    Child: useEffect(() => {}) cleanup 🧹", "color: LightCoral");
    };
  });

  React.useEffect(() => {
    console.log("%c    Child: useEffect(() => {}, [])", "color: MediumTurquoise");
    return () => {
      console.log(`%c    Child: useEffect(() => {}, []) cleanup - [UNMOUNT] 🧹`, "color: MediumTurquoise");
      state.Child = 0;
    };
  }, []);

  React.useEffect(() => {
    console.log("%c    Child: useEffect(() => {}, [count])", "color: HotPink");
    return () => {
      console.log("%c    Child: useEffect(() => {}, [count]) cleanup 🧹", "color: HotPink");
    };
  }, [count]);

  const element = (
    <button className="btn btn-blue" onClick={() => setCount((previousCount) => previousCount + 1)}>
      {count}
    </button>
  );

  console.log("%c    Child: render end", "color: MediumSpringGreen");

  return element;
}

function Child2() {
  const phase = state.Child2 > 0 ? "[UPDATE]" : "[MOUNT]";
  console.log(`%c    Child2: render start ${phase}`, "color: MediumSpringGreen");

  const [count, setCount] = React.useState(() => {
    console.log("%c    Child2: useState(() => 0)", "color: tomato");
    return 0;
  });

  React.useEffect(() => {
    state.Child2++;
    console.log("%c    Child2: useEffect(() => {})", "color: LightCoral");
    return () => {
      console.log("%c    Child2: useEffect(() => {}) cleanup 🧹", "color: LightCoral");
    };
  });

  React.useEffect(() => {
    console.log("%c    Child2: useEffect(() => {}, [])", "color: MediumTurquoise");
    return () => {
      console.log("%c    Child2: useEffect(() => {}, []) cleanup - [UNMOUNT] 🧹", "color: MediumTurquoise");
      state.Child2 = 0;
    };
  }, []);

  React.useEffect(() => {
    console.log("%c    Child2: useEffect(() => {}, [count])", "color: HotPink");
    return () => {
      console.log("%c    Child2: useEffect(() => {}, [count]) cleanup 🧹", "color: HotPink");
    };
  }, [count]);

  const element = (
    <button className="btn btn-blue" onClick={() => setCount((previousCount) => previousCount + 1)}>
      {count}
    </button>
  );

  console.log("%c    Child2: render end", "color: MediumSpringGreen");

  return element;
}

export function Component() {
  const phase = state.App > 0 ? "[UPDATE]" : "[MOUNT]";
  console.log(`%cApp: render start ${phase}`, "color: MediumSpringGreen");

  const [showChild, setShowChild] = React.useState(() => {
    console.log("%cApp: useState(() => false)", "color: tomato", "child1");
    return false;
  });

  const [showChild2, setShowChild2] = React.useState(() => {
    console.log("%cApp: useState(() => false)", "color: tomato", "child2");
    return false;
  });

  React.useEffect(() => {
    state.App++;
    console.log("%cApp: useEffect(() => {})", "color: LightCoral");
    return () => {
      console.log("%cApp: useEffect(() => {}) cleanup 🧹", "color: LightCoral");
    };
  });

  React.useEffect(() => {
    console.log("%cApp: useEffect(() => {}, [])", "color: MediumTurquoise");
    return () => {
      console.log("%cApp: useEffect(() => {}, []) cleanup - [UNMOUNT] 🧹", "color: MediumTurquoise");
      state.App = 0;
    };
  }, []);

  React.useEffect(() => {
    console.log("%cApp: useEffect(() => {}, [showChild])", "color: HotPink");
    return () => {
      console.log("%cApp: useEffect(() => {}, [showChild]) cleanup 🧹", "color: HotPink");
    };
  }, [showChild, showChild2]);

  const element = (
    <div>
      <label className="text-lg leading-loose">
        <input type="checkbox" checked={showChild} onChange={(e) => setShowChild(e.target.checked)} /> show child
      </label>
      <div
        style={{
          padding: 10,
          margin: 10,
          height: 100,
          width: 200,
          border: "solid",
        }}
      >
        {showChild ? <Child /> : null}
      </div>

      <label className="text-lg leading-loose">
        <input type="checkbox" checked={showChild2} onChange={(e) => setShowChild2(e.target.checked)} /> show child 2
      </label>
      <div
        style={{
          padding: 10,
          margin: 10,
          height: 100,
          width: 200,
          border: "solid",
        }}
      >
        {showChild2 ? <Child2 /> : null}
      </div>
    </div>
  );

  console.log("%cApp: render end", "color: MediumSpringGreen");

  return element;
}
