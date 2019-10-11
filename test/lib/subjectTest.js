import { test } from 'tape';
import subject from '../../lib/subject';

const mutableSubscriber = (t, value1, value2) => {
  let expected = value1;
  return (v) => {
    t.equal(v, expected);
    expected = value2;
  };
};

test('subject.subscribe triggers subscriber function', (t) => {
  t.plan(1);
  const value = 'foo';
  subject(value).subscribe((v) => t.equal(v, value));
});

test('subject.next triggers subscriber function', (t) => {
  t.plan(4);
  const [value1, value2] = ['foo', 'bar'];
  const testSubject = subject(value1);
  testSubject.subscribe(mutableSubscriber(t, value1, value2));
  testSubject.subscribe(mutableSubscriber(t, value1, value2));
  testSubject.next(value2);
});

test('subject.unsubscribe deregisters subscriber', (t) => {
  t.plan(3);
  const [value1, value2] = ['foo', 'bar'];
  const testSubject = subject(value1);
  testSubject.subscribe(mutableSubscriber(t, value1, value2));
  const key = testSubject.subscribe((v) => t.equal(v, value1));
  testSubject.unsubscribe(key);
  testSubject.next(value2);
});
