<template>
  <div class="todo">
    <div class="card text-left">
      <div class="card-header">
        ToDo Component
      </div>
      <div class="card-body">
		<modal v-show="isModalVisible">
		<form>
            <div class="form-group">
              <label for="task-title">Task title</label>
              <input v-model="model.title" type="text" class="form-control" id="task-title"
                     aria-describedby="emailHelp">
            </div>
            <div class="form-group">
              <label for="task-desc">Task description</label>
              <textarea v-model="model.description" class="form-control" id="task-desc"></textarea>
            </div>
			<div class="form-group">
              <label for="task-type">Task Type</label>
					<select v-model="model.type" class="form-control" id="task-type">
						<option style="color: red;">TOP HIGH</option>
						<option style="color: pink;">IMPORTANT</option>
						<option style="color: green;">GENERAL</option>
						<option style="color: blue;">MINOR</option>
					</select>
			</div>
            <button type="submit" class="btn btn-primary" @click.prevent="submit" :disabled="!isValid">Submit</button>
        </form>
		
		</modal>
		<div class="card-text">
		<h5 class="card-title">My tasks</h5>
        <button type="button" class="btn btn-primary" @click="showModal">Create New Task</button>
          <ul class="pt-3">
            <li v-for="(item, index) in filteredTaskList" :key="index" class="d-flex justify-content-between mb-3">
              <div>
                <h4 v-if="item.status === 'completed'"><s>{{item.title}}</s></h4>
				<h4 v-else-if="item.type === 'TOP HIGH'"><p style="color: red;">{{item.title}}</p></h4>
				<h4 v-else-if="item.type === 'IMPORTANT'"><p style="color: pink;">{{item.title}}</p></h4>
				<h4 v-else-if="item.type === 'GENERAL'"><p style="color: green;">{{item.title}}</p></h4>
				<h4 v-else-if="item.type === 'MINOR'"><p style="color: blue;">{{item.title}}</p></h4>
                <h4 v-else>{{item.title}}</h4>
                <p>{{item.description}}</p>
              </div>
            <button class="btn btn-primary" @click="item.status = 'completed' ">Compled</button>
            </li>
          </ul>
        </div>
        <div class="card-footer">
          <button class="btn" :class="{'btn-primary':!filterStatus}" @click="filterStatus = ''">All</button>
          <button class="btn" :class="{'btn-primary': filterStatus === 'completed'}"
                  @click="filterStatus = 'completed'">Completed
          </button>
          <button class="btn" :class="{'btn-primary': filterStatus === 'incompleted'}"
                  @click="filterStatus = 'incompleted'">InCompleted
          </button>
          Active tasks count: {{ taskList.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Task} from '../models/task';
  import modal from '../components/Modal.vue';
  export default {	
    name: "ToDo",
	components: {
        modal,
    },
    props: {},
    data: () => {
      return {
        model: new Task(),
        taskList: [],
        filterStatus: "",
		isModalVisible: false,
      }
    },

    methods: {
      submit() {
        this.taskList.push(this.model);
        this.model = new Task();
		this.isModalVisible = false;
      },
	showModal() {
        this.isModalVisible = true;
      }
    },
    watch: {
      message() {
        console.log("Message changed");
      }
    },
    computed: {
      messageLength() {
        return ("" + this.message).length;
      },
      isValid() {
        return this.model.title && this.model.description&&this.model.type;
      },
      filteredTaskList() {
        return this.taskList.filter((item) => {
          if (!this.filterStatus) return true;
          return item.status === this.filterStatus;
        });
      }
    }

  }
</script>

<style scoped>
  .todo {
    background-color: aqua;
  }
</style>
