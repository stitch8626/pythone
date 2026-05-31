// --- ЗАДАНИЕ 1 ---
class CollegeEmployee {
  constructor(name, position, salary) {
      this.name = name;
      this.position = position;
      this.salary = salary;
  }
  getDetails() {
      return `Сотрудник: ${this.name}\nДолжность: ${this.position}\nЗарплата: ${this.salary} руб.`;
  }
}

class Teacher extends CollegeEmployee {
  constructor(name, position, salary, subject) {
      super(name, position, salary);
      this.subject = subject;
  }
  assignHomework() {
      return `Домашнее задание по предмету "${this.subject}" назначено.`;
  }
}

let teacherObj;
document.getElementById('createTeacherBtn').onclick = () => {
  const n = document.getElementById('empName').value;
  const p = document.getElementById('empPosition').value;
  const s = document.getElementById('empSalary').value;
  const sub = document.getElementById('empSubject').value;
  teacherObj = new Teacher(n, p, s, sub);
  document.getElementById('teacherOutput').innerText = "Объект Teacher создан!";
};
document.getElementById('getDetailsBtn').onclick = () => {
  if (teacherObj) document.getElementById('teacherOutput').innerText = teacherObj.getDetails();
};
document.getElementById('assignHwBtn').onclick = () => {
  if (teacherObj) document.getElementById('teacherOutput').innerText = teacherObj.assignHomework();
};

// --- ЗАДАНИЕ 2 ---
class Student {
  constructor(name, groupId, averageGrade) {
      this.name = name;
      this.groupId = groupId;
      this.averageGrade = parseFloat(averageGrade);
  }
  updateGrade(newGrade) {
      this.averageGrade = parseFloat(newGrade);
      return `Средний балл обновлен до ${this.averageGrade}`;
  }
}

class GraduateStudent extends Student {
  constructor(name, groupId, averageGrade, thesisTopic) {
      super(name, groupId, averageGrade);
      this.thesisTopic = thesisTopic;
  }
  submitThesis() {
      return `Выпускник ${this.name} сдал работу на тему: "${this.thesisTopic}"`;
  }
}

let gradObj;
document.getElementById('createGradBtn').onclick = () => {
  gradObj = new GraduateStudent(
      document.getElementById('studName').value,
      document.getElementById('studGroupId').value,
      document.getElementById('studGrade').value,
      document.getElementById('studThesis').value
  );
  document.getElementById('studentOutput').innerText = "Объект GraduateStudent создан!";
};
document.getElementById('updateGradeBtn').onclick = () => {
  if (gradObj) {
      const res = gradObj.updateGrade(document.getElementById('newGradeInput').value);
      document.getElementById('studentOutput').innerText = res;
  }
};
document.getElementById('submitThesisBtn').onclick = () => {
  if (gradObj) document.getElementById('studentOutput').innerText = gradObj.submitThesis();
};

// --- ЗАДАНИЕ 3 ---
class Course {
  constructor(title, duration, cost) {
      this.title = title;
      this.duration = duration;
      this.cost = cost;
  }
  getCourseInfo() {
      return `Курс: ${this.title}\nДлительность: ${this.duration} ч.\nЦена: ${this.cost} руб.`;
  }
}

class OnlineCourse extends Course {
  constructor(title, duration, cost, platform) {
      super(title, duration, cost);
      this.platform = platform;
  }
  startOnline() {
      return `Курс "${this.title}" запущен на платформе ${this.platform}!`;
  }
}

let courseObj;
document.getElementById('createCourseBtn').onclick = () => {
  courseObj = new OnlineCourse(
      document.getElementById('courseTitle').value,
      document.getElementById('courseDuration').value,
      document.getElementById('courseCost').value,
      document.getElementById('coursePlatform').value
  );
  document.getElementById('courseOutput').innerText = "Объект OnlineCourse создан!";
};
document.getElementById('courseInfoBtn').onclick = () => {
  if (courseObj) document.getElementById('courseOutput').innerText = courseObj.getCourseInfo();
};
document.getElementById('startOnlineBtn').onclick = () => {
  if (courseObj) document.getElementById('courseOutput').innerText = courseObj.startOnline();
};

// --- ЗАДАНИЕ 4 ---
class CollegeVehicle {
  constructor(brand, licensePlate, fuel) {
      this.brand = brand;
      this.licensePlate = licensePlate;
      this.fuel = parseFloat(fuel);
  }
  refuel(amount) {
      this.fuel += parseFloat(amount);
      return `Заправка... Текущее топливо: ${this.fuel} л.`;
  }
}

class Bus extends CollegeVehicle {
  constructor(brand, licensePlate, fuel, passengerCapacity) {
      super(brand, licensePlate, fuel);
      this.passengerCapacity = passengerCapacity;
  }
  transportStudents() {
      if (this.fuel >= 10) {
          this.fuel -= 10;
          return `Поездка завершена. Перевезено студентов: ${this.passengerCapacity}. Остаток топлива: ${this.fuel} л.`;
      } else {
          return `Ошибка! Недостаточно топлива для поездки (нужно минимум 10 л).`;
      }
  }
}

let busObj;
document.getElementById('createBusBtn').onclick = () => {
  busObj = new Bus(
      document.getElementById('vehBrand').value,
      document.getElementById('vehPlate').value,
      document.getElementById('vehFuel').value,
      document.getElementById('vehCap').value
  );
  document.getElementById('vehicleOutput').innerText = "Автобус создан!";
};
document.getElementById('refuelBtn').onclick = () => {
  if (busObj) {
      const amt = document.getElementById('refuelAmount').value;
      document.getElementById('vehicleOutput').innerText = busObj.refuel(amt);
  }
};
document.getElementById('transportBtn').onclick = () => {
  if (busObj) document.getElementById('vehicleOutput').innerText = busObj.transportStudents();
};

// --- ЗАДАНИЕ 5 ---
class Library {
  constructor(name) {
      this.name = name;
      this.books = [];
  }
  addBook(book) {
      this.books.push(book);
      return `Книга "${book}" добавлена.`;
  }
}

class DigitalLibrary extends Library {
  constructor(name, website) {
      super(name);
      this.website = website;
  }
  downloadBook(title) {
      if (this.books.includes(title)) {
          return `Имитация скачивания "${title}" с сайта ${this.website}... Готово!`;
      } else {
          return `Книга "${title}" не найдена в библиотеке.`;
      }
  }
}

let libObj;
document.getElementById('createLibBtn').onclick = () => {
  libObj = new DigitalLibrary(
      document.getElementById('libName').value,
      document.getElementById('libUrl').value
  );
  document.getElementById('libOutput').innerText = `Цифровая библиотека "${libObj.name}" готова.`;
};
document.getElementById('addBookBtn').onclick = () => {
  if (libObj) {
      const title = document.getElementById('bookInput').value;
      document.getElementById('libOutput').innerText = libObj.addBook(title);
  }
};
document.getElementById('downloadBtn').onclick = () => {
  if (libObj) {
      const title = document.getElementById('bookInput').value;
      document.getElementById('libOutput').innerText = libObj.downloadBook(title);
  }
};