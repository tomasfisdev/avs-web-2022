<template>
    <div class="loader">Loading...</div>
</template>

<style scoped>
.loader,
.loader:after {
    border-radius: 50%;
    width: 22px;
    height: 22px;
}

.loader {
    font-size: 0px;
    position: absolute;
    right: 1rem;
    bottom: .75rem;
    border-top: 3px solid #007BFF;
    border-right: 3px solid #007BFF;
    border-bottom: 3px solid #007BFF;
    border-left: 3px solid #ffffff;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
}

@-webkit-keyframes load8 {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes load8 {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>