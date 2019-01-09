<template>
    <div>
        <div class="clearfix">
            <h4 class="float-left pt-1">Notifications</h4>
            <b-button variant="link" v-b-toggle.collapseNotifications class="float-right">
                <x-icon></x-icon>
            </b-button>
        </div>

        <p v-if="notifications.length === 0">No notifications for this session.</p>

        <b-alert
            v-for="notification in notifications"
            :key="notification.id"
            show
            dismissible
            :variant="notification.context"
            @dismissed="dismissNotification(notification.id)"
        >
            <strong>{{ notification.context === 'success' ? 'Success' : 'Error' }}</strong>
            <br>
            {{ notification.message }}
        </b-alert>
    </div>
</template>

<script>
import { XIcon } from 'vue-feather-icons'
import { mapState } from 'vuex'

export default {
    components: {
        XIcon
    },
    computed: mapState(['notifications']),
    methods: {
        dismissNotification(id) {
            this.$store.commit('dismissNotification', id)
        }
    }
}
</script>

<style scoped>
.feather {
    height: 28px;
    width: 28px;
    color: #999;
}
</style>
