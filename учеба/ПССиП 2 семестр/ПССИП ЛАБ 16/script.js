// === ЗАДАНИЕ 1: Очередь с приоритетом ===
class TaskQueue {
  constructor() {
    this.queue = [];
  }
  add(name, fn, delay, priority) {
    this.queue.push({ name, fn, delay, priority });
    // Сортировка: чем выше число priority, тем раньше задача в очереди
    this.queue.sort((a, b) => b.priority - a.priority);
    this.process();
  }
  process() {
    if (this.queue.length === 0) return;
    const task = this.queue.shift();
    setTimeout(() => task.fn(), task.delay);
  }
}
const tq = new TaskQueue();

document.getElementById('btn_task1').onclick = () => {
  const name = document.getElementById('t1_name').value || "Задача";
  const prior = parseInt(document.getElementById('t1_prior').value) || 0;
  const out = document.getElementById('out1');
  
  out.innerText = `Добавлено: ${name} (Приоритет: ${prior})`;
  tq.add(name, () => {
    out.innerText += `\n✅ Выполнено: ${name}`;
  }, 1500, prior);
};

// === ЗАДАНИЕ 2: Кэширование с TTL ===
const cache = new Map();
async function fetchData(url, ttl = 10000) {
  const now = Date.now();
  if (cache.has(url)) {
    const entry = cache.get(url);
    if (now - entry.timestamp < ttl) return { data: entry.data, fromCache: true };
  }
  const response = await fetch(url);
  const data = await response.json();
  cache.set(url, { data, timestamp: now });
  return { data, fromCache: false };
}

document.getElementById('btn_task2').onclick = async () => {
  const out = document.getElementById('out2');
  out.innerText = "Загрузка...";
  const res = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
  out.innerText = `Источник: ${res.fromCache ? 'КЭШ' : 'СЕРВЕР'}\nДанные: ${res.data.title}`;
};

// === ЗАДАНИЕ 3: Асинхронные события ===
class AsyncEventEmitter {
  constructor() { this.events = {}; }
  on(group, handler) {
    if (!this.events[group]) this.events[group] = [];
    this.events[group].push(handler);
  }
  async emit(group, data) {
    if (!this.events[group]) return;
    for (const handler of this.events[group]) {
      await handler(data); // Выполняем асинхронно по порядку
    }
  }
}
const emitter = new AsyncEventEmitter();
emitter.on('logs', async (d) => {
  await new Promise(r => setTimeout(r, 500));
  document.getElementById('out3').innerText += `\nОбработка: ${d}`;
});

document.getElementById('btn_task3').onclick = () => {
  document.getElementById('out3').innerText = "Запуск группы событий...";
  emitter.emit('logs', 'Событие А');
  emitter.emit('logs', 'Событие Б');
};

// === ЗАДАНИЕ 4: Конвейер (Pipeline) ===
class Pipeline {
  constructor(stages) {
    this.stages = stages;
    this.currentIndex = 0;
    this.currentData = null;
    this.isPaused = false;
  }
  async start(initialData) {
    this.currentData = initialData;
    this.isPaused = false;
    this.run();
  }
  async run() {
    const out = document.getElementById('out4');
    while (this.currentIndex < this.stages.length && !this.isPaused) {
      this.currentData = await this.stages[this.currentIndex](this.currentData);
      out.innerText = `Этап ${this.currentIndex + 1} завершен. Данные: ${this.currentData}`;
      this.currentIndex++;
    }
    if (this.currentIndex === this.stages.length) out.innerText += "\n🏁 Конвейер полностью завершен!";
  }
  pause() { this.isPaused = true; }
  resume() { this.isPaused = false; this.run(); }
}
const myPipeline = new Pipeline([
  async (val) => { await new Promise(r => setTimeout(r, 1000)); return val + 10; },
  async (val) => { await new Promise(r => setTimeout(r, 1000)); return val * 2; },
  async (val) => { await new Promise(r => setTimeout(r, 1000)); return `Итог: ${val}`; }
]);

document.getElementById('btn_pipeline_start').onclick = () => {
  myPipeline.currentIndex = 0;
  myPipeline.start(5);
};
document.getElementById('btn_pipeline_pause').onclick = () => myPipeline.pause();
document.getElementById('btn_pipeline_resume').onclick = () => myPipeline.resume();

// === ЗАДАНИЕ 5: Лимит вызовов (Semaphore) ===
function throttleAsync(fn, limit) {
  let activeCount = 0;
  const queue = [];

  const processNext = () => {
    if (queue.length > 0 && activeCount < limit) {
      const { args, resolve, reject } = queue.shift();
      activeCount++;
      fn(...args)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          activeCount--;
          processNext();
        });
    }
  };

  return (...args) => {
    return new Promise((resolve, reject) => {
      queue.push({ args, resolve, reject });
      processNext();
    });
  };
}

const heavyTask = async (id) => {
  await new Promise(r => setTimeout(r, 2000));
  return `Задача #${id} завершена`;
};
const limitedTask = throttleAsync(heavyTask, 2);

document.getElementById('btn_task5').onclick = () => {
  const out = document.getElementById('out5');
  out.innerText = "Запущено 5 задач. Лимит: 2 одновременно...\n";
  [1, 2, 3, 4, 5].forEach(async (id) => {
    const result = await limitedTask(id);
    out.innerText += `\n${result}`;
  });
};