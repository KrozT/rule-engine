import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { Measurement } from './measurement.model';

@Controller('measurements')
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}

  /**
   * Create a new measurement and evaluate it against the rules
   * @param measurementData
   */
  @Post()
  async create(@Body() measurementData: Measurement) {
    return this.measurementService.createMeasurement(measurementData);
  }

  /**
   * Find all measurements
   */
  @Get()
  async findAll() {
    return this.measurementService.findAll();
  }

  /**
   * Find a measurement by id
   * @param id
   */
  @Get('id/:id')
  async findById(@Param('id') id: string) {
    return this.measurementService.findById(id);
  }

  /**
   * Find a measurement by topic
   * @param topic
   */
  @Get('topic')
  async findByTopic(@Body('topic') topic: string) {
    return this.measurementService.findByTopic(topic);
  }

  /**
   * Delete all measurements
   */
  @Delete()
  async deleteAll() {
    return this.measurementService.deleteAll();
  }

  /**
   * Delete a measurement by id
   * @param id
   */
  @Delete('id/:id')
  async deleteById(@Param('id') id: string) {
    return this.measurementService.deleteById(id);
  }

  /**
   * Delete all measurements by topic
   * @param topic
   */
  @Delete('topic')
  async deleteByTopic(@Body('topic') topic: string) {
    return this.measurementService.deleteByTopic(topic);
  }

  /**
   * Update a measurement by id
   * @param id
   * @param measurementData
   */
  @Put('id/:id')
  async updateById(
    @Param('id') id: string,
    @Body() measurementData: Measurement,
  ) {
    return this.measurementService.updateById(id, measurementData);
  }

  /**
   * Update a measurement by topic
   * @param topic
   * @param measurementData
   */
  @Put('topic')
  async updateByTopic(
    @Body('topic') topic: string,
    @Body() measurementData: Measurement,
  ) {
    return this.measurementService.updateByTopic(topic, measurementData);
  }
}
