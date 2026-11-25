<template>
  <q-page class="q-pa-lg">
    <div class="row" style="align-items: center;justify-content: space-between">
      <div class="row q-gutter-x-sm" style="align-items: center;">
        <div class="page-title"> پروژه ها</div>
        <div>
          <q-btn label="ایجاد پروژه جدید" outline icon="eva-plus" rounded size="sm" color="primary"
                 @click="newProjectDlg = true"/>
        </div>
      </div>
      <div>
        <q-input
          dense
          input-class="text-right"
          class="q-ml-md"
          color="primary"
          label="فیلتر عنوان پروژه"
        >
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </div>
    </div>
    <div class="q-mt-lg row q-gutter-x-md q-gutter-y-sm">
      <div class="col-auto" v-for="project in projects">
        <project-card :project="project"/>
      </div>
      <div class="col-auto">
        <q-card class="project-card-main flex flex-center cursor-pointer" flat bordered @click="newProjectDlg = true">
          <div class="text-center">
            <q-icon name="eva-plus" size="3rem" color="primary"/>
            <div class="text-primary" style="font-size: 20px;font-weight: 500">
              پروژه جدید
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>

  <q-dialog v-model="newProjectDlg">
    <q-card style="width: 500px; max-width: 90vw;">
      <q-card-section>
        <q-input label="عنوان پروژه"/>
        <div class="text-grey-7 q-mt-md">انتخاب رنگ نماد پروژه</div>
        <div>
          <q-radio
            keep-color
            v-model="color"
            val="teal"
            color="teal"
          />
          <q-radio
            keep-color
            v-model="color"
            val="orange"
            color="orange"
          />
          <q-radio
            keep-color
            v-model="color"
            val="blue"
            color="blue"
          />
          <q-radio
            keep-color
            v-model="color"
            val="red"
            color="red"
          />
          <q-radio
            keep-color
            v-model="color"
            val="green"
            color="green"
          />
          <q-radio
            keep-color
            v-model="color"
            val="purple"
            color="purple"
          />
        </div>

        <q-separator class="q-mt-md" color="grey-5"/>

        <div class="q-mt-lg">
          <div class="text-grey-7">انتخاب اعضا : </div>
          <div><q-input label="فیلتر" outlined rounded style="max-width: 3rem"/></div>
        </div>
      </q-card-section>
    </q-card>

  </q-dialog>
</template>

<script setup>
//
import {projects} from "@/config/projects.js";
import ProjectCard from "@/components/layout/cards/ProjectCard.vue";
import {ref} from "vue";

const newProjectDlg = ref(false)
const color = ref(null)

</script>

<style>
.page-title {
  font-size: 24px;
  font-weight: 700;
}

.project-card-main {
  width: 15rem;
  height: 20rem;
  background: var(--sidebar-bg);
  color: #ffffff;
  border: 1px solid #00bbff
}
</style>
