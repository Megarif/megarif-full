<template>
  <div clfss = "Event">
    <header>
      <div class="imgEvent" :style="{ backgroundImage: `url(${image})` }"></div>
    <span class="WhereGo">
        <p>Поход на выставку</p>
      </span>
    </header>
    <body>
      <p class = description>
        Собираемся с друзьями сходить на выставку современного искусства в гплерею “Бизон”. Давай с нами!)
      </p>
    </body>
    <footer>
      <button class="iGo">Я пойду !</button>
    </footer>
    </div>
</template>
<script
  setup
  lang="ts"
>
import image from '~@/Exhibition.jpg'
</script>

<style
  lang="scss"
  scoped
>

.Event {
  padding: 9px;
  background: #FFFFFF;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  display: flex;

}
.imgEvent {
  position: absolute;
  width: 335px;
  height: 155px;
  border-radius: 16px;
  background-size: cover;

  &:before {
    content: ' ';
    position: absolute;
    width: 100%;
    border-radius: 16px;
    height: 100%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 76.56%, rgba(0, 0, 0, 0.55) 100%);
  }
}



</style>