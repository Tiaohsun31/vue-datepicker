<template>
  <div class="calendar-examples">
    <h2>日曆系統使用範例</h2>
    
    <!-- 1. 基本西元曆 -->
    <div class="example-section">
      <h3>1. 西元曆（預設）</h3>
      <DatePicker 
        v-model="gregorianDate"
        calendar="gregory"
        @change="handleGregorianChange"
      />
      <p>值: {{ gregorianDate }}</p>
    </div>
    
    <!-- 2. ROC 日曆 -->
    <div class="example-section">
      <h3>2. 民國曆</h3>
      <DatePicker 
        v-model="rocDate"
        calendar="roc"
        outputDateFormat="ROC-YYYY-MM-DD"
        @change="handleRocChange"
      />
      <p>值: {{ rocDate }}</p>
      <p class="text-sm text-gray-600">
        支援輸入格式: "113-05-20", "民國113年5月20日", "ROC 113-05-20"
      </p>
    </div>
    
    <!-- 3. 佛曆 -->
    <div class="example-section">
      <h3>3. 佛曆</h3>
      <DatePicker 
        v-model="buddhistDate"
        calendar="buddhist"
        outputDateFormat="BUDDHIST-YYYY-MM-DD"
        @change="handleBuddhistChange"
      />
      <p>值: {{ buddhistDate }}</p>
      <p class="text-sm text-gray-600">
        支援輸入格式: "2567-05-20", "佛曆2567年5月20日", "BE 2567-05-20"
      </p>
    </div>
    
    <!-- 4. 帶日曆選擇器 -->
    <div class="example-section">
      <h3>4. 帶日曆選擇器</h3>
      <DatePicker 
        v-model="dynamicDate"
        :calendar="selectedCalendar"
        :showCalendarSelector="true"
        @calendar-change="handleCalendarChange"
        @change="handleDynamicChange"
      />
      <p>當前日曆: {{ selectedCalendar }}</p>
      <p>值: {{ dynamicDate }}</p>
    </div>
    
    <!-- 5. 測試輸入解析 -->
    <div class="example-section">
      <h3>5. 輸入解析測試</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <!-- ROC 測試 -->
        <div>
          <h4>ROC 輸入測試</h4>
          <input 
            v-model="testInput.roc" 
            placeholder="輸入 ROC 日期"
            class="w-full p-2 border rounded"
            @blur="testRocParsing"
          />
          <div class="mt-2 text-sm">
            <p>解析結果: {{ testResults.roc.success ? '✅' : '❌' }}</p>
            <p v-if="testResults.roc.success">
              日期: {{ testResults.roc.date?.year }}-{{ testResults.roc.date?.month }}-{{ testResults.roc.date?.day }}
            </p>
            <p>來源: {{ testResults.roc.source }}</p>
          </div>
        </div>
        
        <!-- Buddhist 測試 -->
        <div>
          <h4>Buddhist 輸入測試</h4>
          <input 
            v-model="testInput.buddhist" 
            placeholder="輸入佛曆日期"
            class="w-full p-2 border rounded"
            @blur="testBuddhistParsing"
          />
          <div class="mt-2 text-sm">
            <p>解析結果: {{ testResults.buddhist.success ? '✅' : '❌' }}</p>
            <p v-if="testResults.buddhist.success">
              日期: {{ testResults.buddhist.date?.year }}-{{ testResults.buddhist.date?.month }}-{{ testResults.buddhist.date?.day }}
            </p>
            <p>來源: {{ testResults.buddhist.source }}</p>
          </div>
        </div>
        
        <!-- Gregorian 測試 -->
        <div>
          <h4>西元曆測試</h4>
          <input 
            v-model="testInput.gregorian" 
            placeholder="輸入西元日期"
            class="w-full p-2 border rounded"
            @blur="testGregorianParsing"
          />
          <div class="mt-2 text-sm">
            <p>解析結果: {{ testResults.gregorian.success ? '✅' : '❌' }}</p>
            <p v-if="testResults.gregorian.success">
              日期: {{ testResults.gregorian.date?.year }}-{{ testResults.gregorian.date?.month }}-{{ testResults.gregorian.date?.day }}
            </p>
            <p>來源: {{ testResults.gregorian.source }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 6. 格式化測試 -->
    <div class="example-section">
      <h3>6. 格式化測試</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4>相同日期的不同格式</h4>
          <p>西元日期: 2024-05-20</p>
          <ul class="text-sm">
            <li>西元曆: {{ formatExamples.gregorian }}</li>
            <li>民國曆: {{ formatExamples.roc }}</li>
            <li>佛曆: {{ formatExamples.buddhist }}</li>
          </ul>
        </div>
        
        <div>
          <h4>支援的日曆列表</h4>
          <ul class="text-sm">
            <li v-for="cal in supportedCalendars" :key="cal.id">
              {{ cal.name }} ({{ cal.id }}) - 年份範圍: {{ cal.yearRange.min }}-{{ cal.yearRange.max }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import DatePicker from '@/components/DatePicker.vue';
import { CalendarHelper, calendarUtils } from '@/utils/calendarRegistry';

// 基本日期值
const gregorianDate = ref<string | null>(null);
const rocDate = ref<string | null>(null);
const buddhistDate = ref<string | null>(null);
const dynamicDate = ref<string | null>(null);

// 動態日曆選擇
const selectedCalendar = ref('gregory');

// 測試輸入
const testInput = ref({
  roc: '',
  buddhist: '',
  gregorian: ''
});

// 測試結果
const testResults = ref({
  roc: { success: false, date: null, source: 'gregorian' },
  buddhist: { success: false, date: null, source: 'gregorian' },
  gregorian: { success: false, date: null, source: 'gregorian' }
});

// 支援的日曆列表
const supportedCalendars = computed(() => {
  return CalendarHelper.getSupportedCalendars('zh-TW');
});

// 格式化範例
const formatExamples = computed(() => {
  const sampleDate = { year: 2024, month: 5, day: 20 };
  
  return {
    gregorian: CalendarHelper.formatUserOutput(sampleDate, 'gregory', 'YYYY-MM-DD', 'zh-TW'),
    roc: CalendarHelper.formatUserOutput(sampleDate, 'roc', 'ROC-YYYY-MM-DD', 'zh-TW'),
    buddhist: CalendarHelper.formatUserOutput(sampleDate, 'buddhist', 'BUDDHIST-YYYY-MM-DD', 'zh-TW')
  };
});

// 事件處理
const handleGregorianChange = (value: string) => {
  console.log('西元曆變更:', value);
};

const handleRocChange = (value: string) => {
  console.log('民國曆變更:', value);
};

const handleBuddhistChange = (value: string) => {
  console.log('佛曆變更:', value);
};

const handleDynamicChange = (value: string) => {
  console.log(`${selectedCalendar.value} 變更:`, value);
};

const handleCalendarChange = (newCalendar: string) => {
  selectedCalendar.value = newCalendar;
  console.log('日曆切換至:', newCalendar);
};

// 測試解析功能
const testRocParsing = () => {
  testResults.value.roc = calendarUtils.parseInput(testInput.value.roc, 'roc');
};

const testBuddhistParsing = () => {
  testResults.value.buddhist = calendarUtils.parseInput(testInput.value.buddhist, 'buddhist');
};

const testGregorianParsing = () => {
  testResults.value.gregorian = calendarUtils.parseInput(testInput.value.gregorian, 'gregory');
};

onMounted(() => {
  // 設定一些預設值用於展示
  gregorianDate.value = '2024-05-20';
  rocDate.value = CalendarHelper.formatUserOutput(
    { year: 2024, month: 5, day: 20 }, 
    'roc', 
    'ROC-YYYY-MM-DD', 
    'zh-TW'
  );
  buddhistDate.value = CalendarHelper.formatUserOutput(
    { year: 2024, month: 5, day: 20 }, 
    'buddhist', 
    'BUDDHIST-YYYY-MM-DD', 
    'zh-TW'
  );
});
</script>