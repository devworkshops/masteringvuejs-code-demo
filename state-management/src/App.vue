<template>
  <div id="app">
    <header>
      <nav-bar></nav-bar>
    </header>
    <b-container>
      <b-row>
        <b-col>
          <main role="main" class="flex-shrink-0">
            <div class="container">
              <router-view/>
            </div>
          </main>
        </b-col>
        <b-collapse id="collapseNotifications" class="w-30 border-left pl-2">
          <b-col>
            <notification-panel></notification-panel>
          </b-col>
        </b-collapse>
      </b-row>
    </b-container>

    <footer class="footer mt-auto py-3">
      <div class="container">
        <span class="text-muted">Northwind Traders &copy; {{new Date()|date('YYYY')}}</span>
      </div>
    </footer>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import NotificationPanel from '@/components/NotificationPanel.vue'

export default {
    components: {
        NavBar,
        NotificationPanel
    }
}
</script>

<style>
html,
body {
    height: 100%;
}

#app {
    display: flex;
    flex-direction: column;
    height: 100%;
}

main > .container {
    padding: 8px 15px 8px 15px;
}

#collapseNotifications {
    width: 30%;
}

.feather {
    width: 16px;
    height: 16px;
}

.footer {
    background-color: #f5f5f5;
}

.footer > .container {
    padding-right: 15px;
    padding-left: 15px;
}
</style>
