<template>
    <div>
        Home
    </div>
</template>
<script>
export default {
    created() {
        console.log(localStorage.getItem('Authorization'));
    }
}
</script>

<style scoped>
    * {
        font-size: 18px;
    }
</style>