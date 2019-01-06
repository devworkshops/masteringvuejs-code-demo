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

export default {
    components: {
        XIcon
    },
    data() {
        return {
            notifications: [
                {
                    id: 1,
                    context: 'success',
                    message: 'A new product has been created.'
                },
                {
                    id: 2,
                    context: 'danger',
                    message: 'A product has failed to update.'
                }
            ]
        }
    },
    methods: {
        dismissNotification(id) {
            this.notifications = this.notifications.filter(n => n.id !== id)
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
.alert {
}
</style>
