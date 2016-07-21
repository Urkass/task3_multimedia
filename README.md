# Задание для ШРИ 2016 по Multimedia
По ссылке приложение не рабочее - CORS проблемы (локальную загрузку не реализовал)
[Ссылка](https://urkass.github.io/task2_multimedia/)
# Комментарии
Реализованы все основные и дополнительные техники из [задания](https://github.com/shri-msk-2016/dz-multimedia).
# Аудио
Для проигрывания аудио использован Web Audio API. Для достижения эффекта старого звука добавил функцию генерации случайного шума и эффекты (глухой звук и небольшое эхо, будто настоящее пианино)
# Субтитры
Тут особо сказать нечего. Парсятся, разрезаются на строчки и показываются в нужное время.
# Видео
Реализованы эффекты черно-белого кино, царапин, пятен, меняющейся засвеченности кадра и зернистости. Зернистость и царапины хорошо видны на светлых участках видео. Все реализованы с помощью шейдеров WebGL.
# Оптимизация
Для оптимизации использовались шейдеры WebGL и был достигнут стабильный FPS = 60.
# Интерфейс
Т.к. в задании упор был на обработку видео, интерфейс прост - кнопки play/pause.
# PS
При загрузке файлов могут возникнуть проблемы из-за нестабильного CORS сервера. Необходимо будет перезапустить приложение.
