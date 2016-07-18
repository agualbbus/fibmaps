

const idle = (maps) => {
  maps.event.addListener(map, 'idle', () => {
    
  });
}

const runEvents = (maps) => {
  idle(maps);
}

export default runEvents;
