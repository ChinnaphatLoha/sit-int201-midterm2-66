function Animal(name, eatingSound) {
  this.name = name;
  this.eatingSound = eatingSound;
}

Animal.prototype.eats = function () {
  console.log(`${this.name} is eating, ${this.eatingSound}!`);
};

function procreate(animalName, eatingSound) {
  return new Animal(animalName, eatingSound);
}

const dog = procreate('Dog', 'woof');
const cat = procreate('Cat', 'meow');
// console.log(dog);
// console.log(cat);
// dog.eats();
// cat.eats();

const kmuttStudentInfo = {
  university: 'KMUTT',
  address: 'Bangmod, Thungkru, Bangkok',
};

function createKmuttFaculty(facultyName, prefixId) {
  const faculty = {};
  Object.setPrototypeOf(faculty, kmuttStudentInfo);
  faculty.facultyName = facultyName;
  faculty.prefixId = prefixId;
  return faculty;
}

const HR_SIT = () => {
  const sitStudentInfo = createKmuttFaculty('SIT', '130500');
  let lastId = 0;

  const recruit = (name, applyYear) => {
    const student = {
      name,
      id:
        applyYear.toString().substring(2) +
        sitStudentInfo.prefixId +
        (++lastId).toString().padStart(3, '0'),
      faculty: sitStudentInfo.facultyName,
    };
    return student;
  };
  return { recruit };
};

const hr = HR_SIT();
const std001 = hr.recruit('Adam', 2565);
// console.log(std001);

let object = {};
console.log(object?.address?.street);
object.address = { street: 'Prachautid' };
console.log(object?.address?.street);