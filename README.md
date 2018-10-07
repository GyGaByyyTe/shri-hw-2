# shri-hw-2

Изменение позиции отображаемой области - move(1 палец)
Приближение-отдаление - pinch\spread (2 пальца)
Изменение яркости - rotate (2 пальцами)

Особенности:
Элементы для обратной связи переехали вверх макета.
Бесконечной прокрутки по горизонтали нет.
Граничные случаи выхода изображения из области - не обрабатывались.
Перемещение по изображению возможно по обеим координатам.
Изменение яркости возможно одновременно с изменением масштаба.

Разработка велась с использованием:

- Node.JS v8.12.0.
- gulp-cli@2.0.1 установлен глобально на машине

## Запуск
```
npm i
gulp
```