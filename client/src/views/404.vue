<template>
    <div class="text-center">
        <h3>Errors</h3>
        <p>Have some errors...</p>
        <i 
            class="fa fa-backward text-primary"
            data-toggle="tooltip" 
            data-placement="top"
            id="errTooltip" 
            title="Back to home"
            @click="$router.push({ name: 'Home'})"
        ></i>
    </div>
</template>

<script>
export default {
    mounted() {
        $('#errTooltip').tooltip({ boundary: 'window' });
    }
}
</script>
<style scoped>
    .fa-backward {
        cursor: pointer;
    }
</style>