<template lang="pug">
//- There may be additional classes: btn-small, btn-select, pull-right
a.btn.btn-small.btn-select.btn-menu
  |{{$t(name)}}
  //- There may be an additional class popup-right (for right-sided buttons)
  .popup
    //- Here the popup contents should go
    ul.popup-menu
      li
        a.plain
          | Option
</template>

<script lang="babel" type="text/babel">
// File used only for help info

export default {
  // props:['name'],
  data() {
    return {
    };
  },
};
</script>
